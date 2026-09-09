from document_generator import create_document


twitter = """
1/5 AI is changing the way people work and learn.

2/5 AI tools can automate repetitive tasks.

3/5 They can also help analyze information.

4/5 This can improve productivity.

5/5 The future of AI is exciting!
"""

linkedin = """
Artificial intelligence is transforming the way we work and learn.

From automating repetitive tasks to analyzing information,
AI can help people become more productive.

What AI tool has helped you the most?
"""

instagram = """
AI is changing how we work, learn, and create! 🤖✨

The possibilities are growing every day.

#AI #ArtificialIntelligence #Technology #Innovation #Productivity
"""


document = create_document(
    twitter,
    linkedin,
    instagram
)

document.save("test_output.docx")

print("✅ Word document created successfully!")