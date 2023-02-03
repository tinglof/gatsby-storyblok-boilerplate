import React from "react";
import { storyblokEditable } from "gatsby-source-storyblok";

const TextBlock = ({blok}) => {
    return (
        <div {...storyblokEditable(blok)} key={blok.uid}>
            <h1>{blok.Heading}</h1>
            <p>{blok.Paragraph}</p>
        </div>
    )
}

export default TextBlock;