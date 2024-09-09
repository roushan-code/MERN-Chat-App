import { hash } from "bcrypt";
import mongoose,{ Schema, model,Types } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    bio: {
        type: String,
        trim: true

    },
    avatar: {
        public_id:  {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true, 
        }
    }
},
{
    timestamps: true
});

schema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await hash(this.password, 10);
})

export const User = mongoose.models.User || model('User', schema);
