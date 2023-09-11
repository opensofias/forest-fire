const filterSequence = (filterFunc, depth) => {
	const sequence = new Int32Array (depth)
	let progress = 0
	let maxVal = 1
	while (progress < depth) {
		const avoid = filterFunc ({maxVal, progress, sequence})
		let candidate = 0
		while (avoid [candidate]) candidate ++
		maxVal = Math.max (maxVal, candidate)
		sequence [progress] = candidate
		progress ++
	}
	return sequence
}

// original "forest fire" function: avoid three points in arithmetric progression
const a229037_filter = ({maxVal, progress, sequence}) => {
	const avoid = new Int8Array ((maxVal + 1) * 2)
	let steps = 1
	while (steps * 2 < progress + 1) {
		avoid [
			2 * sequence [progress - steps] -
			sequence [progress - steps * 2]
		] = 1
		steps ++
	}
	return avoid
}

const a229037_antiprogression_filter = ({maxVal, progress, sequence}) => {
	const avoid = new Int8Array ((maxVal + 1) * 2)
	let steps = 1
	while (steps * 2 < progress + 1) {
		avoid [
			2 * sequence [progress - steps * 2] -
			sequence [progress - steps]
		] = 1
		steps ++
	}
	return avoid
}

// Lexicographically earliest sequence of positive integers without triples in weakly increasing arithmetic progression. 
const A309890_filter = ({maxVal, progress, sequence}) => {
	const avoid = new Int8Array ((maxVal + 1) * 2)
	let steps = 1
	while (steps * 2 < progress + 1) {
		const p1 = sequence [progress - steps]
		const p2 = sequence [progress - steps * 2]
		p1 >= p2 && (avoid [2 * p1 - p2] = 1)
		steps ++
	}
	return avoid
}

// Lexicographically earliest sequence of positive integers without triples in weakly decreasing arithmetic progression. 
const A309890_but_decreasing_filter = ({maxVal, progress, sequence}) => {
	const avoid = new Int8Array ((maxVal + 1) * 2)
	let steps = 1
	while (steps * 2 < progress + 1) {
		const p1 = sequence [progress - steps]
		const p2 = sequence [progress - steps * 2]
		p1 <= p2 && (avoid [2 * p1 - p2] = 1)
		steps ++
	}
	return avoid
}

// Lexicographically earliest sequence of positive integers without triples in constant arithmetic progression. 
const A100480_filter = ({maxVal, progress, sequence}) => {
	const avoid = new Int8Array (maxVal)
	let steps = 1
	while (steps * 2 < progress + 1) {
		const p1 = sequence [progress - steps]
		const p2 = sequence [progress - steps * 2]
		p1 == p2 && (avoid [p1] = 1)
		steps ++
	}
	return avoid
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
	scatterplot (A100480 (depth), zoomOut, opacity)