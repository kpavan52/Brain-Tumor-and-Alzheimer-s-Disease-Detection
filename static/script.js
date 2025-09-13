const form = document.getElementById("upload-form");
const loader = document.getElementById("loader");
const resultDiv = document.getElementById("result");
const predClass = document.getElementById("pred-class");
const confidenceText = document.getElementById("confidence");
const probBars = document.getElementById("prob-bars");
const recommendation = document.getElementById("recommendation");
const fileInput = document.getElementById("file-input");
const progressCircle = document.querySelector(".progress");

// -------- Preview Uploaded Image --------
fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let imgPreview = document.getElementById("img-preview");
      if (!imgPreview) {
        imgPreview = document.createElement("img");
        imgPreview.id = "img-preview";
        document.querySelector("#preview-container").appendChild(imgPreview);
      }
      imgPreview.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
});

// -------- Recommendations --------
const recommendations = {
  "Alzheimer_MildDemented": [
    "🧠 Maintain daily routines and regular sleep cycles.",
    "📘 Engage in memory exercises and brain games.",
    "⚕️ Consult a neurologist for regular checkups."
  ],
  "Alzheimer_ModerateDemented": [
    "👨‍👩‍👧 Seek caregiver support for daily activities.",
    "💊 Ensure proper medication management.",
    "🏥 Consider memory clinics or therapy groups."
  ],
  "Alzheimer_VeryMildDemented": [
    "🧩 Early intervention with brain-stimulating activities.",
    "🥗 Adopt a balanced diet and exercise regularly.",
    "📅 Monitor changes and consult doctors periodically."
  ],
  "Alzheimer_NonDemented": [
    "✅ No dementia detected.",
    "💪 Maintain a healthy lifestyle with diet and exercise.",
    "🩺 Continue regular preventive checkups."
  ],
  "BrainTumor_Glioma": [
    "⚠️ Consult an oncologist immediately.",
    "🔬 Treatment may involve surgery, radiation, or chemotherapy.",
    "💪 Stay mentally strong and follow prescribed medication."
  ],
  "BrainTumor_Meningioma": [
    "ℹ️ Often benign but may need monitoring.",
    "🔪 Surgery or radiation could be recommended.",
    "🧾 Routine MRIs to track tumor growth."
  ],
  "BrainTumor_Normal": [
    "✅ No tumor detected.",
    "🩺 Maintain regular health checkups.",
    "😌 Adopt a stress-free lifestyle."
  ],
  "BrainTumor_Pitutary;": [
    "🧪 Check hormone levels with an endocrinologist.",
    "⚕️ Surgery may be necessary depending on severity.",
    "👀 Monitor vision and hormonal changes regularly."
  ]
};

// -------- Submit & Predict --------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!fileInput.files.length) return alert("Please upload an image.");

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  loader.classList.remove("hidden");
  resultDiv.classList.add("hidden");

  try {
    const response = await fetch("/predict", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    predClass.textContent = data.predicted_class;

    // Confidence Gauge
    const conf = (data.confidence * 100).toFixed(2);
    confidenceText.textContent = conf + "%";
    const offset = 283 - (283 * conf) / 100;
    progressCircle.style.strokeDashoffset = offset;

    // Probability bars (color-coded)
    probBars.innerHTML = "";
    for (const [cls, prob] of Object.entries(data.all_probabilities)) {
      const bar = document.createElement("div");
      bar.className = "prob-bar";

      // Alzheimer = blue, Tumor = red
      const barColor = cls.startsWith("Alzheimer") ? "#42a5f5" : "#ef5350";

      bar.innerHTML = `
        <span>${cls} (${(prob*100).toFixed(2)}%)</span>
        <div class="bar"><div class="bar-fill" style="width: ${prob*100}%; background:${barColor}"></div></div>
      `;
      probBars.appendChild(bar);
    }

    // Show recommendations
    const recs = recommendations[data.predicted_class] || ["⚕️ Please consult a medical professional."];
    recommendation.innerHTML = "<ul>" + recs.map(r => `<li>${r}</li>`).join("") + "</ul>";

    loader.classList.add("hidden");
    resultDiv.classList.remove("hidden");

  } catch (error) {
    loader.classList.add("hidden");
    alert("Error: " + error.message);
  }
});
