import React from 'react'
import './App.css'


function App() {

  const handleImage = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    console.log('0')
    if(hIEvent.target.files != null){
      const file = hIEvent.target.files[0]
      const fileReader = new FileReader()
      const img = new Image()
      const canvas = document.getElementById("aaa") as HTMLCanvasElement
      const ctx =  canvas.getContext('2d')
      console.log('1')
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        console.log('2')
        img.onload = () => {
          console.log('3')
          if(ctx != null){
            var imgSize = 0
            if(img.width > img.height){
              imgSize = img.width
            }else{
              imgSize = img.height
            }
            ctx.drawImage(img,0,0,imgSize,imgSize,0,0,640,640)
            drawBlueLine()
          }
        } 
        console.log('5')
        img.src = event.target?.result as string 
      }
      console.log('6')
      fileReader.readAsDataURL(file)

    }
    console.log('7')

  }

  const drawBlueLine = () => {
    const grid = 32
    console.log('a0')
    const canvas = document.getElementById("aaa") as HTMLCanvasElement
    const ctx =  canvas.getContext('2d')
    console.log('a1')
    if(ctx != null){

      ctx.strokeStyle = 'gray'
      ctx.lineWidth = 1

      for(var i = 0;i < grid;i++){
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * (i + 1) / grid)
        ctx.lineTo(canvas.width, canvas.height * (i + 1) / grid)
        ctx.closePath()
        ctx.stroke()
      }
      for(var j = 0;j < grid;j++){
        ctx.beginPath()
        ctx.moveTo(canvas.width * (j + 1) / grid, 0)
        ctx.lineTo(canvas.width * (j + 1) / grid, canvas.height)
        ctx.closePath()
        ctx.stroke()
      }

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
      <canvas id="aaa" width="640" height="640" ></canvas>
    </div>

  )
}


export default App
