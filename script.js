const form = document.querySelector('form');
const input = document.querySelector('input');
const imageContainer = document.getElementById('image-container');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = input.value;
  input.value = '';
  generateImage(prompt);
});

async function generateImage(prompt) {
  try {
    const response = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (data.image) {
      const imageElement = document.createElement('img');
      imageElement.src = data.image;
      imageContainer.appendChild(imageElement);
    } else {
      throw new Error('画像URLがレスポンスに含まれていません。');
    }

  } catch (error) {
    console.error('画像の生成に失敗しました。', error);
  }
}