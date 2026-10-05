const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
let previousFocus;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    previousFocus = button;
    viewerImage.src = button.dataset.image;
    viewerImage.alt = button.dataset.title;
    document.querySelector('#viewer-title').textContent = button.dataset.title;
    document.querySelector('#open-image').href = button.dataset.image;
    viewer.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
});
viewer.addEventListener('close', () => {
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
});
