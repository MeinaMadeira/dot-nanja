import React, {useState} from 'react'
import './App.css'


function App() {

  const [grid, setGrid] = useState(32)
  const [gridSwitch, setGridSwitch] = useState(0)
  const [bright, setBright] = useState(27)
  const [brightSwitch, setBrightSwitch] = useState(0)

  const handleGrid = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.value != null){
      var gridStr = hIEvent.target.value
      var gridNum: number = +gridStr
      setGrid(gridNum)
    }
  }

  const switchGrid = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.value != null){
      var gridSwitchStr = hIEvent.target.value
      var gridSwitchNum: number = +gridSwitchStr
      if(gridSwitchNum === 0){
        gridSwitchNum = 1
      }else{
        gridSwitchNum = 0
      }
      setGridSwitch(gridSwitchNum)
    }
  }

  const handleBright = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.value != null){
      var brightStr = hIEvent.target.value
      var brightNum: number = +brightStr
      setBright(brightNum)
    }
  }

  const switchBright = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.value != null){
      var brightSwitchStr = hIEvent.target.value
      var brightSwitchNum: number = +brightSwitchStr
      if(brightSwitchNum === 0){
        brightSwitchNum = 1
      }else{
        brightSwitchNum = 0
      }
      setBrightSwitch(brightSwitchNum)
    }
  }

  const handleImage = (hIEvent: React.ChangeEvent<HTMLInputElement>) => {
    if(hIEvent.target.files != null){
      const file = hIEvent.target.files[0]
      if(file !== undefined){
        const fileReader = new FileReader()
        const img = new Image()
        const canvasA = document.getElementById("prevCanvas") as HTMLCanvasElement
        const canvasB = document.getElementById("postCanvas") as HTMLCanvasElement
        const ctxA =  canvasA.getContext('2d')
        const ctxB =  canvasB.getContext('2d')
        if(ctxA != null && ctxB != null){
          ctxA.clearRect(0,0,640,640)
          ctxB.clearRect(0,0,640,640)
        }
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
          img.onload = () => {
            if(ctxA != null){
              var imgSize = 0
              if(img.width > img.height){
                imgSize = img.width
              }else{
                imgSize = img.height
              }
              ctxA.drawImage(img,0,0,imgSize,imgSize,0,0,640,640)
            }
          } 
          img.src = event.target?.result as string 
        }
        fileReader.readAsDataURL(file)
      }
    }
  }

  const pixelize = () => {
    const canvasA = document.getElementById("prevCanvas") as HTMLCanvasElement
    const canvasB = document.getElementById("postCanvas") as HTMLCanvasElement
    const ctxA =  canvasA.getContext('2d')
    const ctxB =  canvasB.getContext('2d')
    
    if(ctxA != null && ctxB != null){
      var gridSize = canvasA.width / grid
      
      for (var m = 0; m < grid; m += 1) {
        for (var n = 0; n < grid; n += 1) {
          var imageData = ctxA.getImageData(m * gridSize,n * gridSize,gridSize,gridSize)
          var data = imageData.data
          var pRed = 0
          var pGreen = 0
          var pBlue = 0
          var pAlpha = 0

          for (var i = 0; i < data.length; i += 4) {
              pRed     += data[i]  // red
              pGreen   += data[i + 1]  // green
              pBlue    += data[i + 2]  // blue
              pAlpha   += data[i + 3] // alpha
          }
          if(brightSwitch === 0){
            pRed = pRed / (data.length / 4)
            pGreen = pGreen / (data.length / 4)
            pBlue = pBlue / (data.length / 4)
            pAlpha = pAlpha / (data.length / 4)
          }else{
            if(bright == 8){
              pRed = reduceColor8(pRed / (data.length / 4))
              pGreen = reduceColor8(pGreen / (data.length / 4))
              pBlue = reduceColor8(pBlue / (data.length / 4))
            }else if(bright == 27){
              pRed = reduceColor27(pRed / (data.length / 4))
              pGreen = reduceColor27(pGreen / (data.length / 4))
              pBlue = reduceColor27(pBlue / (data.length / 4))
            }else{
              pRed = reduceColor64(pRed / (data.length / 4))
              pGreen = reduceColor64(pGreen / (data.length / 4))
              pBlue = reduceColor64(pBlue / (data.length / 4))
            }

            pAlpha = pAlpha / (data.length / 4)            
          }

          //var pColor = (pRed + pBlue + pGreen) / 3

          for (var j = 0; j < data.length; j += 4) {
            data[j]      = pRed   // red
            data[j + 1]  = pGreen // green
            data[j + 2]  = pBlue // blue
            data[j + 3]  = 255
            if(pAlpha < 128){
              data[j + 3]  = 0
            }
          }
        ctxB.putImageData(imageData,m * gridSize,n * gridSize)
        }
      }
      if(gridSwitch === 1){
        drawGrid()
      }
      //
    }
  }

  const reduceColor8 = (pictData: number) => {
    var result = 0
    if(pictData < 128){
      result = 64
    }else{
      result = 192
    }
    return result
  }

  const reduceColor27 = (pictData: number) => {
    var result = 0
    if(pictData < 85){
      result = 43
    }else if(pictData < 170){
      result = 128
    }else{
      result = 213
    }
    return result
  }

  const reduceColor64 = (pictData: number) => {
    var result = 0
    if(pictData < 64){
      result = 0
    }else if(pictData < 128){
      result = 96
    }else if(pictData < 192){
      result = 160
    }else{
      result = 224
    }
    return result
  }

  const drawGrid = () => {
    const canvas = document.getElementById("postCanvas") as HTMLCanvasElement
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

  return (
    <div className="App">
      <h1>ドット絵変換ジェネレータ</h1>
      <input type="file" id="pict" onChange={handleImage} />

      <br />
      <input type="checkbox" id="gridSwitch" name="gridSwitch" value={gridSwitch} onChange={switchGrid} checked={gridSwitch === 1} />
      <label>グリッドを描画する</label>

      <input type="radio" name="grid" value="16" onChange={handleGrid} checked={grid === 16} />
      <label>16x16</label>
      <input type="radio" name="grid" value="32" onChange={handleGrid} checked={grid === 32} />
      <label>32x32</label>
      <input type="radio" name="grid" value="64" onChange={handleGrid} checked={grid === 64} />
      <label>64x64</label>    
      
      <br />
      <input type="checkbox" id="switchBright" name="switchBright" value={brightSwitch} onChange={switchBright} checked={brightSwitch === 1} />
      <label>減色処理をONにする</label>

      <input type="radio" name="bright" value="8" onChange={handleBright} checked={bright === 8} />
      <label>8色</label>
      <input type="radio" name="bright" value="27" onChange={handleBright} checked={bright === 27} />
      <label>27色</label>
      <input type="radio" name="bright" value="64" onChange={handleBright} checked={bright === 64} />
      <label>64色</label>  

      <br />
      <input type="button" value="ドットに変換！！" onClick={pixelize}/>
      <br />
      <canvas id="prevCanvas" width="640" height="640" ></canvas>
      <canvas id="postCanvas" width="640" height="640" ></canvas>
    </div>

  )
}


export default App
