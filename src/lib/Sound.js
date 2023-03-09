export default class Sound {
    constructor(audioEl) {
        this.audioEl = audioEl
        this.audioEl.volume = 0.9
        this.fftSize = 64
        this.audioCtx = new AudioContext()
        this.audioSource = this.audioCtx.createMediaElementSource(this.audioEl)
        this.analyser = new AnalyserNode(this.audioCtx, {
            fftSize: this.fftSize,
            smoothingTimeConstant: 0,
            // minDecibels: -90,
            // maxDecibels: -25,
        })
        this.audioSource.connect(this.analyser)
        this.analyser.connect(this.audioCtx.destination)
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
    }

    resume() {
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume()
            this.audioEl.play()
        }
    }

    getNormData() {
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normalizedSamples = [...this.dataArray].map((sample) => sample / 128 - 1)
        return normalizedSamples
    }
    getData() {
        // this.analyser.getByteFrequencyData(this.dataArray)
        this.analyser.getByteTimeDomainData(this.dataArray)
        return this.dataArray
    }
}
