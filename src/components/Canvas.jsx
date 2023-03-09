const Canvas = ({ cnvRef, className, width = 350, height = 350 }) => {
    return <canvas className={className} ref={cnvRef} width={width} height={height}></canvas>
}

export default Canvas
