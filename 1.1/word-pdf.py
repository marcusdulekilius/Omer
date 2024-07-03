from flask import Flask, render_template, request, send_file
from docx import Document
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    # Dosya yükleme işlemi
    if 'wordFile' not in request.files:
        return "No file part"
    
    file = request.files['wordFile']
    
    # File Control
    if file.filename == '':
        return "No selected file"
    
    if file and file.filename.endswith('.docx'):
        # Word to PDF
        doc = Document(file)
        pdf_output = BytesIO()
        doc.save(pdf_output)
        pdf_output.seek(0)
        
        # Download
        return send_file(pdf_output, attachment_filename='output.pdf', as_attachment=True)
    
    return "Unsupported file format"

if __name__ == '__main__':
    app.run(debug=True)
