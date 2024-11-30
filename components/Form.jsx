import Link from 'next/link'
import React from 'react'

const Form = ({type ,post ,SetPost ,submitting ,handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
            {type} and Share amazing prompts and let your imagination get a face with any AI powered platform
        </p>

        <form 
            onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            <label>
                <span className='font-satoshi font-bold text-base text-gray-700'> Your AI Prompt </span>
                <textarea 
                    value={post.prompt}
                    onChange={(e) => SetPost({...post,  prompt: e.target.value})}
                    placeholder='Write your prompt here'
                    required
                    className='form_textarea'
                />
            </label>

            <label>
                <span className='font-satoshi font-bold text-base text-gray-700'> Tag <span className='font-normal'>(#product, #web development, #business)</span> </span>
                <input 
                    value={post.tag}
                    onChange={(e) => SetPost({...post,  tag: e.target.value})}
                    placeholder='Add tags'
                    required
                    className='form_input'
                />
            </label>

            <div className='flex flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>

                <button type='submit' disabled={submitting} className='px-5 py-1.5 bg-primary-orange rounded-full text-white'>
                    {submitting ? `${type}...` : type}
                </button>
            </div>
            
            
        </form>
    </section>
  )
}

export default Form