from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from scraper import scrape_article
from ai_generator import generate_social_content
from document_generator import create_document


# ==========================================
# CREATE FLASK APP
# ==========================================

app = Flask(__name__)

# Allow frontend to communicate with Flask
CORS(app)


# ==========================================
# HOME ROUTE
# ==========================================

@app.route("/")
def home():

    return "AI Content Repurposer Backend is Running! 🚀"


# ==========================================
# SCRAPE ARTICLE
# ==========================================

@app.route("/api/scrape", methods=["POST"])
def scrape():

    data = request.get_json()

    url = data.get("url") if data else None

    if not url:

        return jsonify({
            "success": False,
            "message": "URL is required."
        }), 400


    article = scrape_article(url)


    if not article:

        return jsonify({
            "success": False,
            "message": "Could not extract article content."
        }), 400


    return jsonify({

        "success": True,

        "url": url,

        "article": article

    })


# ==========================================
# GENERATE AI CONTENT
# ==========================================

@app.route("/api/generate", methods=["POST"])
def generate():

    data = request.get_json()

    article = data.get("article") if data else None


    if not article:

        return jsonify({
            "success": False,
            "message": "Article content is required."
        }), 400


    try:

        generated_content = generate_social_content(article)


        return jsonify({

            "success": True,

            "content": generated_content

        })


    except Exception as error:

        print(f"AI generation failed: {error}")


        return jsonify({

            "success": False,

            "message": "AI content generation failed."

        }), 500


# ==========================================
# CREATE AND DOWNLOAD WORD DOCUMENT
# ==========================================

@app.route("/api/download", methods=["POST"])
def download_document():

    data = request.get_json()


    twitter = data.get("twitter") if data else None

    linkedin = data.get("linkedin") if data else None

    instagram = data.get("instagram") if data else None


    if not twitter or not linkedin or not instagram:

        return jsonify({

            "success": False,

            "message": "All social-media content is required."

        }), 400


    try:

        # Create Word document
        document = create_document(

            twitter,

            linkedin,

            instagram

        )


        # File name
        file_path = "AI_Content_Repurposed.docx"


        # Save document
        document.save(file_path)


        # Send document to browser
        return send_file(

            file_path,

            as_attachment=True,

            download_name="AI_Content_Repurposed.docx"

        )


    except Exception as error:

        print(
            f"Document generation failed: {error}"
        )


        return jsonify({

            "success": False,

            "message": "Could not create document."

        }), 500


# ==========================================
# RUN FLASK SERVER
# ==========================================

if __name__ == "__main__":

    app.run(debug=True)