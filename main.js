const calculate = depth => {
	const result = new Int32Array (depth)
	let progress = 0
	let maxVal = 1
	while (progress < depth) {
		const avoid = new Int8Array ((maxVal + 1) * 2)
		let steps = 1
		while (steps * 2 < progress + 1) {
			avoid [
				2 * result [progress - steps] -
				result [progress - steps * 2]
			] = 1
			steps ++
		}
		let candidate = 0
		while (avoid [candidate]) candidate ++
		maxVal = Math.max (maxVal, candidate)
		result [progress] = candidate
		progress ++
	}
	return result
}

const scatterplot = (sequence, zoomOut = 1, opacity = 255) => {
	const max = sequence.reduce ((prev, cur) => Math.max (prev, cur), 0) + 1
	const squeeze =
		Math.floor (Math.log2 (sequence.length / max))
	const canvas = document.createElement ('canvas')
	canvas.height = max / zoomOut
	canvas.width = sequence.length / 2 ** squeeze / zoomOut
	document.body.appendChild (canvas)
	const ctx = canvas.getContext ('2d')
	ctx.fillStyle = '#fff'
	ctx.fillRect (0, 0, sequence.length / 2 ** squeeze / zoomOut, max / zoomOut)
	ctx.fillStyle = 'rgb(0 0 0 /' + opacity + ')'
	sequence.forEach (
		(val, idx) => ctx.fillRect (idx / 2 ** squeeze / zoomOut, val / zoomOut, 1, 1)
	)
}

window.drawfire = (depth, zoomOut, opacity) =>
	scatterplot (calculate (depth), zoomOut, opacity)