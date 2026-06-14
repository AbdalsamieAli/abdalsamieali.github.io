
    /**
     * Draws the x- and y-axes on a given canvas.
     */
    function drawAxes(canvas) {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Draw axes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // X-axis
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      // Y-axis
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // Arrowheads
      ctx.fillStyle = '#333';
      // Right arrow
      ctx.beginPath();
      ctx.moveTo(w - 10, cy - 5);
      ctx.lineTo(w, cy);
      ctx.lineTo(w - 10, cy + 5);
      ctx.fill();
      // Top arrow
      ctx.beginPath();
      ctx.moveTo(cx - 5, 10);
      ctx.lineTo(cx, 0);
      ctx.lineTo(cx + 5, 10);
      ctx.fill();

      // Labels
      ctx.font = '12px sans-serif';
      ctx.fillText('', w - 15, cy - 8);
      ctx.fillText('', cx + 5, 15);
      ctx.fillText('0', cx + 3, cy - 5);

      // Tick marks every 30 px
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 1;
      for (let d = 30; d < cx; d += 30) {
        // X axis positive
        ctx.beginPath();
        ctx.moveTo(cx + d, cy - 4);
        ctx.lineTo(cx + d, cy + 4);
        ctx.stroke();
        // X axis negative
        ctx.beginPath();
        ctx.moveTo(cx - d, cy - 4);
        ctx.lineTo(cx - d, cy + 4);
        ctx.stroke();
        // Y axis positive
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy - d);
        ctx.lineTo(cx + 4, cy - d);
        ctx.stroke();
        // Y axis negative
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy + d);
        ctx.lineTo(cx + 4, cy + d);
        ctx.stroke();
      }
    }

    /**
     * Plots a point on the canvas context from polar coordinates.
     */
    function plotPoint(ctx, magnitude, angleDeg, color) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const rad = (angleDeg * Math.PI) / 180;
      const x = magnitude * Math.cos(rad);
      const y = magnitude * Math.sin(rad);

      // Canvas pixel coordinates (y is inverted)
      const px = cx + x;
      const py = cy - y;

      // Draw point
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw line from origin to point
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px monospace';
      ctx.fillText(`${magnitude.toFixed(1)} <${angleDeg.toFixed(1)}°`, px + 6, py - 6);
    }

    /**
     * Redraws everything on a specific canvas.
     *
     */
    function redraw(canvasId, magI, angleI) {
      const canvas = document.getElementById(canvasId);
      const color = ['red', 'yellow', 'blue'];

      drawAxes(canvas);                     // First draw axes
      const ctx = canvas.getContext('2d');
      for (let i = 0; i < magI.length; i++) {
		plotPoint(ctx, magI[i], angleI[i], color[i]);           // Then plot the point
           };
      };
      
      function mulComplex(x, y) {
		return {r: x.r * y.r, theta: x.theta + y.theta};
      };

      function addComplex(a, b) {
		const re = a.r * Math.cos(a.theta) + b.r * Math.cos(b.theta);
		const im = a.r * Math.sin(a.theta) + b.r * Math.sin(b.theta);
		const r = Math.sqrt(re ** 2 + im ** 2);
		const o = Math.atan2(im, re);

		return {r: r, theta: o};
      };

      function matMulComplex(A, B) {
		const m = A.length;
		const n = B.length;
		const p = B[0].length;

		const C = Array.from({ length: m}, () => 
			Array.from({length: p}, () => ({r: 0, theta: 0}))
		);

		for (let i = 0; i < m; i++) {
			for (let j = 0; j < p; j++) {
				for (let k = 0; k < n; k++) {
					const product = mulComplex(A[i][k], B[k][j]);
					C[i][j] = addComplex(C[i][j], product);
				};
			};
		};
      
		return C;
      };
 
      function symm_comp(magI, angleI) {
		// a operator
		const a = {r: 0.333, theta: 240 * Math.PI / 180};
		const a2 = {r: 0.333, theta: 120 * Math.PI / 180}; 
		const o = {r: 0.333, theta: 0};
		
		// matrix A
		Ainv = [
              [o, o, o],[o, a2, a],[o, a, a2]
            ];


		const Isys = [
              [{r: magI[0], theta: angleI[0]}], [{r: magI[1], theta: angleI[1]}], [{r: magI[2], theta: angleI[2]}]
			];    

		const I = matMulComplex(Ainv, Isys);
		return I;
	  };      

      function main() {
		const magIa = parseFloat(document.getElementById('magIa').value);
		const angIa = parseFloat(document.getElementById('angleIa').value);
		const magIb = parseFloat(document.getElementById('magIb').value);
		const angIb = parseFloat(document.getElementById('angleIb').value);
		const magIc = parseFloat(document.getElementById('magIc').value);
		const angIc = parseFloat(document.getElementById('angleIc').value);

		const magI = [magIa, magIb, magIc];
		const angleI = [angIa, angIb, angIc];
		redraw('canvas1', magI, angleI);
		
		const ang = [angIa * Math.PI / 180,angIb * Math.PI / 180,angIc * Math.PI / 180]
		const I = symm_comp(magI, ang);
		
		
		// Zero sequence 
		const I1 = I[0][0];
		const I1m = I1.r;
		const I1a = I1.theta * 180 / Math.PI;
		const magI1 = [I1m, I1m, I1m];
		const angI1 = [I1a, I1a, I1a];
		redraw('canvas2', magI1, angI1);


		// postive sequence 
		const a = {r: 1, theta: 120 * Math.PI / 180 };
		const a2 = {r: 1, theta: 240 * Math.PI / 180}; 
		
		const I2 = I[1][0];
		const I2am = I2.r;
		const I2a = I2.theta * 180 / Math.PI;
		const I2bm = mulComplex(I2, a2).r;
		const I2b = mulComplex(I2, a2).theta * 180 / Math.PI;
		const I2cm = mulComplex(I2, a).r;
		const I2c = mulComplex(I2, a).theta * 180 / Math.PI;
		const magI2 = [I2am, I2bm, I2cm];
		const angI2 = [I2a, I2b, I2c];	  
		redraw('canvas3', magI2, angI2);
		
		// negtive sequence
		const I3 = I[2][0];
		const I3am = I3.r;
		const I3a = (I3.theta * 180) / Math.PI;
		const I3bm = mulComplex(I3, a).r;
		const I3b = mulComplex(I3, a).theta * 180 / Math.PI;
		const I3cm = mulComplex(I3, a2).r;
		const I3c = mulComplex(I3, a2).theta * 180 / Math.PI;
		const magI3 = [I3am, I3bm, I3cm];
		const angI3 = [I3a, I3b, I3c];
        redraw('canvas4', magI3, angI3);
		
      };

     main();
    // Redraw on button click
     document.getElementById('drawBtn').addEventListener('click', main);
