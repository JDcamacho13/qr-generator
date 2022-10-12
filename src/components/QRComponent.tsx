import { useEffect, useRef, useState } from "react"
import { Loading } from "./Loading"

export const QRComponent = () => {
  const [loading, setLoading ] = useState(true)
  const [qr, setQr ] = useState('')
  const [url, setUrl] = useState('')
  const divQR: React.RefObject<HTMLDivElement> = useRef(null)

  const generateQR = (url: string) => {
    setLoading(true)
    fetch('/api/generate-qr', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    }).then(res => res.json())
    .then(res => {
      setLoading(false)
      setQr(res.svg)
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateQR(url)
  }

  useEffect(() => {
    generateQR('https://www.frontendmentor.io')
  }, [])

  return (
    <div className="max-w-[90vw] w-[320px] bg-white h-[500px] rounded-2xl p-4 shadow-xl">
      <div className="w-full h-3/5 bg-blue-background rounded-xl relative overflow-hidden grid place-content-center">
        <div className="w-full h-full rounded-full absolute right-[40%] bottom-[45%] bg-lightblue-background"></div>
        {loading ? <div className="w-[120px] h-[120px]"><Loading /></div> : 
        <div ref={divQR} className="relative z-10 w-56" dangerouslySetInnerHTML={{__html: qr}}>
        </div>
        }
        <div className="w-full h-full rounded-full absolute left-[50%] top-[70%] bg-lightblue-background"></div>
      </div>
      <main className="flex flex-col justify-between h-2/5">
        <form className="p-3" onSubmit={onSubmit}>
          <h1 className="text-2xl text-dark-blue font-bold mb-3">QR generator</h1>
          <label className="flex flex-col">
            <span className="text-dark-blue pl-1 text-lg">Enter a URL</span>
            <div className="relative">
              <input disabled={loading} value={url} onChange={e => setUrl(e.target.value)} 
                className="w-full rounded-xl focus:ring outline-0 p-2 border border-grayish-blue text-sm pr-12 disabled:bg-gray-200" 
                type='url' 
                required
                placeholder="https://www.frontendmentor.io" 
              />
              { loading && <div className="w-5 h-5 absolute right-5 top-2"><Loading theme="dark"/></div> }
            </div>
          </label>
        </form>
        <div className="text-center">
          <p className="text-sm text-grayish-blue">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" className="text-sky-700 font-bold">Frontend Mentor</a>. 
          </p>
          <p className="text-xs text-grayish-blue">
            Coded with 💙 by <a href="https://www.linkedin.com/in/jdcamacho13/"  target="_blank" className="text-sky-700 font-bold">JDcamacho</a>.
          </p>
        </div>
      </main>
    </div>
  )
}