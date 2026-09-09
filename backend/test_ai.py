from ai_generator import generate_social_content

test_article = """
Artificial intelligence is transforming the way people work and learn.
AI tools can help users automate repetitive tasks, analyze information,
generate content, and improve productivity.
"""

result = generate_social_content(test_article)

print("\n========== AI GENERATED CONTENT ==========\n")
print(result)