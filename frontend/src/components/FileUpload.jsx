import axios from 'axios'

function FileUpload() {

  const uploadFiles = async (e) => {

    const files = e.target.files

    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {

      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      alert(response.data.message)

    } catch (error) {
      console.error(error)
      alert('Upload failed')
    }

  }

  return (
    <div className='mb-6'>

      <label className='block mb-3 text-sm text-slate-400'>
        Upload Interview Documents
      </label>

      <input
        type='file'
        multiple
        onChange={uploadFiles}
        className='w-full bg-slate-800 p-3 rounded-xl'
      />

    </div>
  )
}

export default FileUpload