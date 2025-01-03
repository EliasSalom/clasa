import {computed, makeAutoObservable, observable} from "mobx";

const DEVIDER_SIZE = 40;

function generateId(): number {
    return Math.round(Math.random() * 10000);
}

class Section {
    nodeType: string = "section";
    id: number;
    width: number;
    height: number;
    frameSize: number;
    type: string;
    splitDirection: string | null;
    sections: Array<Section | Devider>;

    constructor(attrs: { width: number; height: number; frameSize?: number; type?: string }) {
        this.id = generateId();
        this.width = attrs.width;
        this.height = attrs.height;
        this.frameSize = attrs.frameSize || 0;
        this.type = attrs.type || "none";
        this.splitDirection = null;
        this.sections = [];
        makeAutoObservable(this, {
            sections: observable.shallow,
        });
    }
}

class Devider {
    nodeType: string = "devider";
    id: number;
    width: number;
    height: number;
    sections: Section[] = [];

    constructor(attrs: { width: number; height: number }) {
        this.id = generateId();
        this.width = attrs.width;
        this.height = attrs.height;
        makeAutoObservable(this);
    }
}

class Store {
    selectedSectionId: number | null = null;
    root: Section;

    constructor() {
        this.root = new Section({
            width: 800,
            height: 1000,
            frameSize: 50,
        });
        this.root.sections.push(
            new Section({
                width: 800 - 50 * 2,
                height: 1000 - 50 * 2,
            })
        );

        makeAutoObservable(this, {
            selectedSection: computed,
        });
    }

    get selectedSection(): Section | null {
        const findNested = (sec: Section, id: number | null): Section | null => {
            if (sec.id === id) {
                return sec;
            }
            for (const child of sec.sections) {
                if (child instanceof Section) {
                    const found = findNested(child, id);
                    if (found) return found;
                }
            }
            return null;
        };
        return findNested(this.root, this.selectedSectionId);
    }

    setSectionType(type: string): void {
        if (this.selectedSection) {
            this.selectedSection.type = type;
            this.selectedSection.frameSize = type === "none" ? 0 : this.selectedSection.frameSize || 50;
        }
    }

    splitCurrentSection(direction: "vertical" | "horizontal"): void {
        const selectedSection = this.selectedSection;

        if (selectedSection) {
            selectedSection.splitDirection = direction;

            if (direction === "vertical") {
                selectedSection.sections.push(
                    new Section({
                        width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                        height: selectedSection.height,
                    }),
                    new Devider({
                        width: DEVIDER_SIZE,
                        height: selectedSection.height,
                    }),
                    new Section({
                        width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                        height: selectedSection.height,
                    })
                );
            } else {
                selectedSection.sections.push(
                    new Section({
                        width: selectedSection.width,
                        height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                    }),
                    new Devider({
                        width: selectedSection.width,
                        height: DEVIDER_SIZE,
                    }),
                    new Section({
                        width: selectedSection.width,
                        height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                    })
                );
            }

            this.selectedSectionId = null;
        }
    }
}

export default new Store();