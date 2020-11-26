import React, {useState} from 'react'
import { storage } from './firebase'
import firebase from "firebase/app"
import "firebase/firestore"


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

function App() {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const handleImage = () => {
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
      <img src={imageUrl} alt="uploaded" />
    </div>

  )
}


export default App
