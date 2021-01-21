import React from 'react'
import './App.css'


function App() {

  const handleImage = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.files != null){
      const file = hIEvent.target.files[0]
      const fileReader = new FileReader()
      const img = new Image()
      const canvas = document.getElementById("aaa") as HTMLCanvasElement
      const ctx =  canvas.getContext('2d')
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        img.onload = () => {
          if(ctx != null){
            var imgSize = 0
            if(img.width > img.height){
              imgSize = img.width
            }else{
              imgSize = img.height
            }
            ctx.drawImage(img,0,0,imgSize,imgSize,0,0,640,640)
            pixelize()
          }
        } 
        img.src = event.target?.result as string 
      }
      fileReader.readAsDataURL(file)
    }
  }

  const pixelize = () => {
    const canvasA = document.getElementById("aaa") as HTMLCanvasElement
    const canvasB = document.getElementById("bbb") as HTMLCanvasElement
    const ctxA =  canvasA.getContext('2d')
    const ctxB =  canvasB.getContext('2d')

    if(ctxA != null && ctxB != null){
      var grid = 32 
      var gridSize = canvasA.width / grid
      
      for (var m = 0; m < grid; m += 1) {
        for (var n = 0; n < grid; n += 1) {
          var imageData = ctxA.getImageData(m * gridSize,n * gridSize,gridSize,gridSize)
          var data = imageData.data
          var pRed = 0
          var pGreen = 0
          var pBlue = 0

          for (var i = 0; i < data.length; i += 4) {
            pRed     += data[i]   // red
            pGreen   += data[i + 1] // green
            pBlue    += data[i + 2] // blue
          }
          pRed = pRed / (data.length / 4)
          pGreen = pGreen / (data.length / 4)
          pBlue = pBlue / (data.length / 4)
        
          for (var j = 0; j < data.length; j += 4) {
            data[j]      = pRed   // red
            data[j + 1]  = pGreen // green
            data[j + 2]  = pBlue // blue
          }
        ctxB.putImageData(imageData,m * gridSize,n * gridSize)
        }
      }

      drawGrid()
    }
  }




  const drawGrid = () => {
    const grid = 32
    const canvas = document.getElementById("bbb") as HTMLCanvasElement
    const ctx =  canvas.getContext('2d')
    if(ctx != null){

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1

      for(var i = 0;i < grid;i++){
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * (i + 1) / grid)
        ctx.lineTo(canvas.width, canvas.height * (i + 1) / grid)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(canvas.width * (i + 1) / grid, 0)
        ctx.lineTo(canvas.width * (i + 1) / grid, canvas.height)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  const onSubmit = () => {

  }

  return (
    <div className="App">
       <h1>ドット絵変換ジェネレータ</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>Upload</button>
      </form>
      <canvas id="aaa" width="640" height="640" ></canvas>
      <canvas id="bbb" width="640" height="640" ></canvas>
    </div>

  )
}


export default App
