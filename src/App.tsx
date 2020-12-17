import React, {useState} from 'react'
import firebase, { storage } from './firebase'


function App() {
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState("")
  const [vSize, setVSize] = useState(0)

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files != null){
      const image = event.target.files[0]
      const fileReader = new FileReader()
      let imageVUrl = ""

      fileReader.onload = () => {
        imageVUrl += "<img alt=" + image.name + " src=" + fileReader.result + " />"
        document.getElementById("ID001")!.innerHTML = imageVUrl
      }
      fileReader.readAsDataURL(image)
      setImage(image)
    }
  }

  const onSubmit = () => {
  }

  return (
    <div>
       <h1>画像アップロード</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>Upload</button>
      </form>

      <p id="ID001"></p>
    </div>

  )
}


export default App
