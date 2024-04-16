
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from flask import Flask
import warnings
app=Flask(__name__)
#LLM


#API Checking

@app.route('/<question>')   
def index(question):
    warnings.filterwarnings("ignore")
    llm = GoogleGenerativeAI(model="models/text-bison-001", google_api_key='AIzaSyCm8eI5zbQhB7TeQqlctNHgDC8EPxRqEFw')

    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key="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", model_name="sentence-transformers/all-MiniLM-l6-v2"
    )

    #Loading from Local VectorDatabase
    db=FAISS.load_local('db',embeddings)
    retriever=db.as_retriever()

    #retrieval step to fetch relevant documents, then passes those documents into an LLM to generate a response.

    template="""Given the following questions and context, generate answers based on this context only. Just answer the asked question.don't try to make things up. If u dont know anything, just answer "ask me questions only based on context.".If there are 2 questions, give a hint about for what you're answering.Summarize the answer but don't miss any detail.after all answers return, "If you have any other queries related to HDFC details,fell free to ask..."
        CONTEXT:{context}
        QUESTION:{question}
    """

    prompt=PromptTemplate(
        template=template,input_variables=["context","question"]
    )
    chain=RetrievalQA.from_chain_type(llm=llm,chain_type='stuff',retriever=retriever,input_key='query',chain_type_kwargs={"prompt":prompt})

    reply=chain(question)['result']

    return reply

if __name__=='__main__':
    app.run(debug=True)