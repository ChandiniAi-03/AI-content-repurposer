// ==========================================
// ELEMENTS
// ==========================================

const scrapeBtn =
    document.getElementById("scrapeBtn");

const urlInput =
    document.getElementById("url");

const status =
    document.getElementById("status");

const loader =
    document.getElementById("loader");

const articleSection =
    document.getElementById("articleSection");

const articleContent =
    document.getElementById("articleContent");

const resultsSection =
    document.getElementById("resultsSection");

const twitterContent =
    document.getElementById("twitterContent");

const linkedinContent =
    document.getElementById("linkedinContent");

const instagramContent =
    document.getElementById("instagramContent");

const downloadBtn =
    document.getElementById("downloadBtn");



// ==========================================
// REPURPOSE CONTENT
// ==========================================

scrapeBtn.addEventListener(
    "click",
    async () => {

        const url =
            urlInput.value.trim();


        // ==================================
        // VALIDATE URL
        // ==================================

        if (!url) {

            status.textContent =
                "⚠️ Please enter an article URL.";

            return;
        }


        // ==================================
        // RESET UI
        // ==================================

        status.textContent =
            "🕷️ Extracting article...";

        articleSection.classList.add("hidden");

        resultsSection.classList.add("hidden");

        loader.classList.add("hidden");

        scrapeBtn.disabled = true;



        try {

            // ==================================
            // STEP 1 — SCRAPE ARTICLE
            // ==================================

            const scrapeResponse =
                await fetch(
                    "http://127.0.0.1:5000/api/scrape",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            url: url
                        })
                    }
                );


            const scrapeData =
                await scrapeResponse.json();


            if (
                !scrapeResponse.ok ||
                !scrapeData.success
            ) {

                throw new Error(
                    scrapeData.message ||
                    "Failed to extract article."
                );
            }


            const article =
                scrapeData.article;


            // Display article

            articleContent.textContent =
                article;

            articleSection.classList.remove(
                "hidden"
            );



            // ==================================
            // STEP 2 — AI GENERATION
            // ==================================

            status.textContent =
                "🤖 AI is creating your content...";

            loader.classList.remove(
                "hidden"
            );


            const aiResponse =
                await fetch(
                    "http://127.0.0.1:5000/api/generate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            article: article
                        })
                    }
                );


            const aiData =
                await aiResponse.json();


            if (
                !aiResponse.ok ||
                !aiData.success
            ) {

                throw new Error(
                    aiData.message ||
                    "AI generation failed."
                );
            }



            // ==================================
            // STEP 3 — SUCCESS
            // ==================================

            status.textContent =
                "🎉 Content generated successfully!";

            loader.classList.add(
                "hidden"
            );

            resultsSection.classList.remove(
                "hidden"
            );


            const content =
                aiData.content;


            console.log(
                "AI GENERATED CONTENT:"
            );

            console.log(content);



            // ==================================
            // STEP 4 — SEPARATE CONTENT
            // ==================================

            const twitterMatch =
                content.match(
                    /Twitter\/X Thread([\s\S]*?)(?=LinkedIn Post|Instagram Caption|$)/i
                );


            const linkedinMatch =
                content.match(
                    /LinkedIn Post([\s\S]*?)(?=Instagram Caption|$)/i
                );


            const instagramMatch =
                content.match(
                    /Instagram Caption([\s\S]*)/i
                );



            // ==================================
            // STEP 5 — DISPLAY RESULTS
            // ==================================

            twitterContent.textContent =
                twitterMatch
                    ? twitterMatch[1].trim()
                    : "Twitter content not found.";


            linkedinContent.textContent =
                linkedinMatch
                    ? linkedinMatch[1].trim()
                    : "LinkedIn content not found.";


            instagramContent.textContent =
                instagramMatch
                    ? instagramMatch[1].trim()
                    : "Instagram content not found.";


        }


        catch (error) {

            console.error(error);


            loader.classList.add(
                "hidden"
            );


            status.textContent =
                "❌ " + error.message;

        }


        finally {

            scrapeBtn.disabled = false;

        }

    }
);



// ==========================================
// DOWNLOAD WORD DOCUMENT
// ==========================================

downloadBtn.addEventListener(
    "click",
    async () => {

        status.textContent =
            "📄 Creating your Word document...";


        downloadBtn.disabled = true;


        try {

            const response =
                await fetch(
                    "http://127.0.0.1:5000/api/download",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            twitter:
                                twitterContent.textContent,

                            linkedin:
                                linkedinContent.textContent,

                            instagram:
                                instagramContent.textContent

                        })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Could not create the document."
                );
            }


            const blob =
                await response.blob();


            const downloadUrl =
                window.URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href =
                downloadUrl;


            link.download =
                "AI_Content_Repurposed.docx";


            document.body.appendChild(link);


            link.click();


            link.remove();


            window.URL.revokeObjectURL(
                downloadUrl
            );


            status.textContent =
                "✅ Word document downloaded successfully!";

        }


        catch (error) {

            console.error(error);


            status.textContent =
                "❌ " + error.message;

        }


        finally {

            downloadBtn.disabled = false;

        }

    }
);



// ==========================================
// COPY BUTTONS
// ==========================================

const copyButtons =
    document.querySelectorAll(
        ".copy-btn"
    );


copyButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            async () => {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );


                const targetElement =
                    document.getElementById(
                        targetId
                    );


                const text =
                    targetElement.textContent.trim();


                if (!text) {

                    button.textContent =
                        "⚠️ Empty";


                    setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copy";

                        },
                        1500
                    );


                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        text
                    );


                    button.textContent =
                        "✅ Copied!";


                    setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copy";

                        },
                        1500
                    );

                }


                catch (error) {

                    console.error(
                        "Copy failed:",
                        error
                    );


                    button.textContent =
                        "❌ Failed";


                    setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copy";

                        },
                        1500
                    );

                }

            }
        );

    }
);