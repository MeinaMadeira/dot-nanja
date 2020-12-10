import React, {useState} from 'react'
import firebase from "firebase"
import './firebase.ts'


function App() {
  const storage = firebase.storage()
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState("")

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files != null){
      const image = event.target.files[0]
      setImage(image)
    }
  }

  const onSubmit = () => {
    if (image == null) {
      console.log("ファイルが選択されていません")
    }
    // アップロード処理
    if(typeof image != 'undefined'){
      const uploadTask = storage.ref(`/images/${image.name}`).put(image)
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,{
          'next': next,
          'error': error,
          'complete': complete
        })
    }
  }
  const next = (snapshot: firebase.storage.UploadTaskSnapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done")
    console.log(snapshot)
  }
  const error = (error: firebase.storage.FirebaseStorageError) => {
    // エラーハンドリング
    console.log(error)
  }
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    if(typeof image != 'undefined'){
      storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
        setImageUrl(fireBaseUrl)
      })
    }
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
