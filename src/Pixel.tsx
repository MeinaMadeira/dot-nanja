import React, {useState} from 'react'
import clsx from 'clsx'
import { createStyles, useTheme, Theme, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PublishIcon from '@material-ui/icons/Publish'
import SettingsIcon from '@material-ui/icons/Settings'
import ReplayIcon from '@material-ui/icons/Replay'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import './App.css'


function Pixel() {

  const drawerWidth = 300
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  })
  )
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const [originImg, setOriginImg] = useState<HTMLImageElement>()
  const [grid, setGrid] = useState(32)
  const [gridSwitch, setGridSwitch] = useState(0)
  const [bright, setBright] = useState(27)
  const [brightSwitch, setBrightSwitch] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

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
        const canvas = document.getElementById("postCanvas") as HTMLCanvasElement
        const ctx =  canvas.getContext('2d')

        if(ctx != null){
          ctx.clearRect(0,0,512,512)
        }
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
          img.onload = () => {
            if(ctx != null){
              var imgSize = 0
              if(img.width > img.height){
                imgSize = img.width
              }else{
                imgSize = img.height
              }
              setOriginImg(img)
              ctx.drawImage(img,0,0,imgSize,imgSize,0,0,512,512)
            }
          } 
          img.src = event.target?.result as string 
        }
        fileReader.readAsDataURL(file)
      }
    }
  }

  const pixelize = () => {
    drawOriginImg()
    const canvas = document.getElementById("postCanvas") as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    
    if(ctx != null){
      var gridSize = canvas.width / grid
      
      for (var m = 0; m < grid; m += 1) {
        for (var n = 0; n < grid; n += 1) {
          var imageData = ctx.getImageData(m * gridSize,n * gridSize,gridSize,gridSize)
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
            if(bright === 8){
              pRed = reduceColor8(pRed / (data.length / 4))
              pGreen = reduceColor8(pGreen / (data.length / 4))
              pBlue = reduceColor8(pBlue / (data.length / 4))
            }else if(bright === 27){
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
          var color = 'rgba('+ pRed +','+ pGreen +',' + pBlue + ',' + pAlpha / 255 + ')' 
          drawPixelSquare(ctx, color,gridSize,m,n)
        }
      }
      if(gridSwitch === 1){
        drawGrid()
      }
    }
  }

  const drawPixelSquare = (ctx: CanvasRenderingContext2D, color: string, gridSize: number, m: number, n: number) => {
    ctx.strokeStyle = color
    ctx.fillStyle = color 
    ctx.fillRect(m * gridSize,n * gridSize,gridSize,gridSize)  
  }

  /** 
  const drawPixelCircle = (ctx: CanvasRenderingContext2D, color: string, gridSize: number, m: number, n: number) => {
          ctx.beginPath ()
          ctx.arc(m * gridSize + gridSize / 2, n * gridSize + gridSize / 2, (gridSize / 2) - 1, 0 * Math.PI / 180, 360 * Math.PI / 180, false )
          ctx.strokeStyle = color
          ctx.fillStyle = color 
          ctx.fill() 
          ctx.stroke()
  }
*/

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

  const drawOriginImg = () => {
    const canvas = document.getElementById("postCanvas") as HTMLCanvasElement
    const ctx =  canvas.getContext('2d')
    if(ctx != null){
      ctx.clearRect(0,0,512,512)
      if(originImg != null){
        var imgSize = 0
        if(originImg.width > originImg.height){
          imgSize = originImg.width
        }else{
          imgSize = originImg.height
        }
        ctx.drawImage(originImg,0,0,imgSize,imgSize,0,0,512,512)
        }
      }
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <Typography variant="h4" noWrap className={classes.title}>
            ピクセルアートフィルター
          </Typography>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <canvas id="postCanvas" width="512" height="512" ></canvas>

        <Button component="label">
          <PublishIcon />
          <input type="file" id="pict" onChange={handleImage} style={{ display: "none" }} />
        </Button>
        
        <Button onClick={drawOriginImg}>
          <ReplayIcon />
        </Button>

        <Button variant="contained" onClick={pixelize}>変換！</Button>

      </main>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <Divider />
        <FormControlLabel
          control={
            <Checkbox
              checked={gridSwitch === 1}
              onChange={switchGrid}
              name="gridSwitch"
              value={gridSwitch}
              color="primary"
            />
          }
          label="グリッドを描画する"
        />
        <Divider />
        <FormControl component="fieldset">
          <FormLabel component="legend">ピクセル数選択</FormLabel>
          <RadioGroup name="grid" defaultValue="32" onChange={handleGrid} row>
            <FormControlLabel value="16" control={<Radio  color="primary" />} label="16" labelPlacement="bottom" />
            <FormControlLabel value="32" control={<Radio  color="primary" />} label="32" labelPlacement="bottom" />
            <FormControlLabel value="64" control={<Radio  color="primary" />} label="64" labelPlacement="bottom" />
            <FormControlLabel value="128" control={<Radio  color="primary" />} label="128" labelPlacement="bottom" />
          </RadioGroup> 
        </FormControl>
        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={brightSwitch === 1}
              onChange={switchBright}
              name="switchBright"
              value={brightSwitch}
              color="primary"
            />
          }
          label="減色処理をする"
        />
          
        <FormControl component="fieldset">
          <RadioGroup name="bright" defaultValue="27" onChange={handleBright} row>
            <FormControlLabel value="8" control={<Radio  color="primary" disabled={brightSwitch === 0} />} label="8色" labelPlacement="bottom" />
            <FormControlLabel value="27" control={<Radio  color="primary" disabled={brightSwitch === 0} />} label="27色" labelPlacement="bottom" />
            <FormControlLabel value="64" control={<Radio  color="primary" disabled={brightSwitch === 0} />} label="64色" labelPlacement="bottom" />
          </RadioGroup> 
        </FormControl>
        <Divider />
      </Drawer>        
    </div>

  )
}


export default Pixel
