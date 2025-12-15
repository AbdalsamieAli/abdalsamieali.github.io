const image = document.getElementById('image')
const images = image.src.split('/')
image.src = '../img/' + images[images.length - 1]

for (const i in ['1', '2', '3']) {
    const im = document.getElementById('image'+i)
    const ims = image.src.split('/')
    image.src = '../img/' + ims[ims.length - 1]   
}