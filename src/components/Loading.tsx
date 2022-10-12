export const Loading = ({ theme = 'light' }) => {
  let colors = 'border-white/40 border-t-white'
  if (theme !== 'light') {
    colors = 'border-blue-background/40 border-t-dark-blue'
  }
  
  return (
    <div className={`w-full h-full rounded-full border-4  animate-spin ${colors}`}></div>
  )
}