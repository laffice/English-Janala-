const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class= "btn"> ${el}</span>`);
  return htmlElements.join(" ");
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

const displayData = (lessons) => {
  const lessonsContainer = document.getElementById("lesson-container");
  lessonsContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id ="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>`;
    lessonsContainer.appendChild(btnDiv);
  }
};

const removeClass = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const manageSpinner =(status) => {
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("level-words-container").classList.add("hidden");
  }
  else{
       document.getElementById("level-words-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const loadLevelWords = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      removeClass();

      clickBtn.classList.add("active");
      displayLevelWords(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div class="space-y-5 p-5 rounded-md border border-sky-100">
  <div>
        <h2 class="font-bold text-xl ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
        
      </div>
      <div>
        <h3 class="font-bold text-lg">Meaning</h3>
        <p class="font-semibold">${word.meaning}</p>
      </div>
      <div>
        <h3 class="font-bold text-lg">Examples</h3>
        <p class="font-semibold">${word.sentence}</p>
      </div>
        <div>
          <h3 class="font-bold text-lg">
            সমার্থক শব্দ গুলো
          </h3>
         <div> 
         ${createElements(word.synonyms)}
         </div>
          <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Complete learning</button>
      </form>
    </div>
    </div> 
    
</div>`;
  document.getElementById("word_modal").showModal();
};

const displayLevelWords = (words) => {
  const levelWordContainer = document.getElementById("level-words-container");
  levelWordContainer.innerHTML = "";

  if (words.length == 0) {
    levelWordContainer.innerHTML = `<div class="font-bangla text-center col-span-full py-14 space-y-8 ">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-semibold text-3xl">নেক্সট Lesson এ যান</h1>

      </div> `;
      manageSpinner(false);
    return;
  };
  for (let word of words) {
    const levelWordDiv = document.createElement("div");
    levelWordDiv.innerHTML = ` <div class="bg-white text-center px-5 py-10 rounded-xl shadow-lg space-y-5">
      <h1 class="font-bold text-lg">${word.word}</h1>
      <p class="font-semibold ">Meaning/Pronunciation </p>
      <div class="font-semibold text-xl font-bangla"> ${word.meaning ? word.meaning : "not available"}/${word.Pronunciation ? word.Pronunciation : "not available"}</div>
      <div class="flex justify-between ">
        <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume"></i></button>
      </div>
    </div>`;
    levelWordContainer.append(levelWordDiv);
  };
  manageSpinner(false);
};

loadLessons();
