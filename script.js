// Simulated image data (replace with actual data from images.json)
const imageData = [
  { id: 1, url: "https://picsum.photos/id/1/200/300" },
  { id: 2, url: "https://picsum.photos/id/2/200/300" },
  { id: 3, url: "https://picsum.photos/id/3/200/300" },
  { id: 4, url: "https://picsum.photos/id/4/200/300" },
  { id: 5, url: "https://picsum.photos/id/5/200/300" },
  { id: 6, url: "https://picsum.photos/id/6/200/300" },
  { id: 7, url: "https://picsum.photos/id/7/200/300" },
  { id: 8, url: "https://picsum.photos/id/8/200/300" },
  { id: 9, url: "https://picsum.photos/id/9/200/300" },
  { id: 10, url: "https://picsum.photos/id/10/200/300" },
]

const imageGrid = document.getElementById("image-grid")
const modal = document.getElementById("modal")
const canvas = document.getElementById("image-canvas")
const ctx = canvas.getContext("2d")
const closeBtn = document.querySelector(".close")
const searchInput = document.getElementById("search-input")
const colorButtons = document.querySelectorAll(".color-btn")

let currentImage = null
const imageBgColors = {} // Store background colors for each image

function createImageGrid(images) {
  imageGrid.innerHTML = ""
  images.forEach((image) => {
    const imageItem = document.createElement("div")
    imageItem.classList.add("image-item")
    imageItem.innerHTML = `
            <img src="${image.url}" alt="Image ${image.id}">
            <div class="image-label">ID: ${image.id}</div>
        `
    imageItem.addEventListener("click", () => openModal(image))
    imageGrid.appendChild(imageItem)
  })
}

function openModal(image) {
  currentImage = image
  modal.classList.add("show")
  // Reset background color to white when opening an image
  imageBgColors[image.id] = "#ffffff"
  drawImageOnCanvas(image.url)
}

function drawImageOnCanvas(url) {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.onload = () => {
    // Set canvas size
    canvas.width = 600 // Fixed width
    canvas.height = 600 // Fixed height

    // Fill background with the color specific to this image
    ctx.fillStyle = imageBgColors[currentImage.id]
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate aspect ratio
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
    const x = canvas.width / 2 - (img.width / 2) * scale
    const y = canvas.height / 2 - (img.height / 2) * scale

    // Draw image
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
  }
  img.src = url
}

function closeModal() {
  modal.classList.remove("show")
}

function filterImages(query) {
  const filteredImages = imageData.filter((image) => image.id.toString() === query);
  createImageGrid(filteredImages)
}

// Event listeners
closeBtn.addEventListener("click", closeModal)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

searchInput.addEventListener("input", (e) => {
  filterImages(e.target.value)
})

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentImage) {
      imageBgColors[currentImage.id] = button.dataset.color
      drawImageOnCanvas(currentImage.url)
    }
  })
})

// Initial setup
createImageGrid(imageData)

