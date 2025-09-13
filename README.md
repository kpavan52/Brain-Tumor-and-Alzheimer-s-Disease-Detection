1.🧠 Brain Disease Detection (MRI)

    EfficientNetB7-based application for detecting Brain Tumor and Alzheimer’s Disease from MRI scans.

2.🚀 Getting Started

3.🛠️ Step-by-Step Instructions

4.📥 Download & Extract the Project

        Download the ZIP file from this GitHub repository.
        Extract it to your preferred location
        
5.🖥️ Open Command Prompt

        Press Windows + R, type cmd, and hit Enter.
        
6.📂 Navigate to the Project Folder

        Run the following command (adjust the path if needed):
        cd C:\Users\YourName\Projects\BrainDiseaseDetection
        
7.📥 Download the Pretrained Model

        The trained EfficientNetB7 model (~200MB) is stored on Google Drive.
        Download it from here:
        
            https://drive.google.com/file/d/1MHMVbHaaR2Ar8UxQaGdFCB9j8D9liqOE/view?usp=sharing
            
        Place the file in the project root folder, alongside app.py
        
8.🚀 Start the Flask App

        Run this command in the project root folder:
                python app.py
                
9.🌐 Open in Browser

        Once the server starts, open your browser and go to:
              http://127.0.0.1:5000/
              
10.📱 Test the Application

        Upload an MRI scan image.
        The app will process the image and predict whether it belongs to:
        Normal(Healthy Brain)
        Brain Tumor (Glioma, Meningioma, Pituitary)
        Alzheimer’s Disease (Mild, Moderate, Severe, or Non-Demented)
        
⚡ That’s it! Your Brain Disease Detection app should now be up and running.
