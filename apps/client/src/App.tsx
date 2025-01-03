import InputPanel from "./components/InputPanel/InputPanel.tsx";
import {ClosetPlanner} from "./components/PreviewPanel/PreviewPanel.tsx";
import {Box} from "@mui/material";

function App() {

  return (
    <Box style={{display:"flex"}}>
      <InputPanel/>
      <ClosetPlanner/>
    </Box>
  )
}

export default App
