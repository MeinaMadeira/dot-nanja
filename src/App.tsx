import React, {useState} from 'react'
import './App.css'
import firebase, { storage } from './firebase'


function App() {
  const [image, setImage] = useState<File>()

  const handleImage = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.files != null){
      const file = hIEvent.target.files[0]
      const fileReader = new FileReader()
      const img = new Image()
      const canvas = document.getElementById("aaa") as HTMLCanvasElement
      const ctx =  canvas.getContext('2d')

      fileReader.onload = (event) => {
        img.onload = () => {
          if(ctx != null){
            ctx.drawImage(img,0,0)
          }
        } 
        img.src = event.target?.result as string 
      }
      fileReader.readAsDataURL(file)
      setImage(file)
    }
  }

  const onSubmit = () => {
  }

  return (
    <div className="App">
       <h1>画像アップロード</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>Upload</button>
      </form>

      <div id="ID001"></div>
      <canvas id="aaa" width="640" height="480" ></canvas>
    </div>

  )
}


export default App
