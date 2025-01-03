import InputPanel from "./components/InputPanel/InputPanel.tsx";
import ClosetDesigner from "./components/PreviewPanel/PreviewPanel.tsx";
import {Box} from "@mui/material";

function App() {

  return (
    <Box style={{display:"flex"}}>
    <InputPanel/>
      <ClosetDesigner/>
    </Box>
  )
}

export default App
