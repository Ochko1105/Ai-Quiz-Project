// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>quiz</title>
//   </head>
//   <body>
//     <script>
//       let quizs = [
//         { question: "What is 2 + 2?", answers: [1, 2, 3, 4], correctAnswer: 4 },
//         {
//           question: "What is the capital of France?",
//           answers: ["Paris", "London", "Berlin", "Madrid"],
//           correctAnswer: "Paris",
//         },
//         {
//           question: "What is the largest ocean on Earth?",
//           answers: ["Pacific", "Atlantic", "Indian", "Arctic"],
//           correctAnswer: "Pacific",
//         },
//       ];
//       const body = document.querySelector("body");
//       const startBtn = document.createElement("button");
//       startBtn.innerHTML = "Start Quiz";
//       body.appendChild(startBtn);

//       let currentIndex = 0;
//       let correctAnswers = 0;
//       const quizStart = () => {
//         startBtn.remove();
//         const question = document.createElement("h3");
//         body.appendChild(question);

//         // Create answer buttons and store them in an array
//         const answerBtns = [];
//         for (let i = 0; i < 4; i++) {
//           const btn = document.createElement("button");
//           body.appendChild(btn);
//           answerBtns.push(btn);
//           btn.addEventListener("click", () => {
//             // Check if the clicked answer is correct
//             if (
//               quizs[currentIndex].answers[i] ===
//               quizs[currentIndex].correctAnswer
//             ) {
//               correctAnswers++;
//             }
//             currentIndex++;
//             if (currentIndex < quizs.length) {
//               drawQuestion();
//             } else {
//               body.innerHTML = `Quiz finished. Your correct answer ${correctAnswers}/${quizs.length}.`;
//             }
//           });
//         }

//         const drawQuestion = () => {
//           answerBtns.forEach((btn, index) => {
//             btn.innerText = quizs[currentIndex].answers[index];
//           });
//           question.innerText = quizs[currentIndex].question;
//         };
//         drawQuestion();
//       };
//       startBtn.addEventListener("click", quizStart);
//     </script>
//   </body>
// </html>
