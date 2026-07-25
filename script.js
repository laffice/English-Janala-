const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

const loadLevelWords = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};

const displayLevelWords = (words) => {
  // console.log(words);
  const levelWordContainer = document.getElementById('level-words-container');
  levelWordContainer.innerHTML = "";
  for(let word of words){
    const levelWordDiv = document.createElement('div')
    levelWordDiv.innerHTML= ` <div class="bg-white text-center px-5 py-10 rounded-xl shadow-lg space-y-5">
      <h1 class="font-bold text-lg">${word.word}</h1>
      <p class="font-semibold ">Meaning/Pronunciation </p>
      <div class="font-semibold text-xl font-bangla"> ${word.meaning}/${word.Pronunciation}</div>
      <div class="flex justify-between ">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume"></i></button>
      </div>
    </div>`
    levelWordContainer.append(levelWordDiv);
  }

  // "id": 4,
  // "level": 5,
  // "word": "Diligent",
  // "meaning": "পরিশ্রমী",
  // "pronunciation": "ডিলিজেন্ট"

};
// loadLevelWords();


const displayData = (lessons) => {
  // console.log(lessons);
  const lessonsContainer = document.getElementById("lesson-container");
  lessonsContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `  <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    lessonsContainer.appendChild(btnDiv);
  }
};
loadLessons();
