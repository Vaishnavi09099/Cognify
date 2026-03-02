import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:[true,"Please provide a document title"],
        trime:true
    },
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number,
        required:true
    },
    extractedText:{
        type:String,
        default:""
    },
    chunks:[{
        content:{
            type:String,
        required:true
        },
        pageNumber:{
               type:Number,
        required:true

        },
        chunkIndex:{
               type:Number,
        required:true
        }
    }],
    uploadDate:{
        type:Date,
        default:Datenow
    },
    lastAccessed:{
         type:Date,
        default:Datenow
    },
    status:{
        type:String,
        enum:['processing','ready','failed'],
        default:'proessing'

    }

},{
    timestamps:true
})

const Document = mongoose.model("Document",documentSchema);

export default Document;