import React from "react"
import { graphql } from "gatsby"
import localStorage from 'local-storage'

import { StoryblokComponent, storyblokEditable, useStoryblokState } from "gatsby-source-storyblok"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const pageQueryStory = data.storyblokEntry;
  const persistedQueryIdentifier = `storyBlokSavedLiveQuery-${pageQueryStory.id}`;
  const liveQueryStoryContentFromLocalStorage = localStorage.get(persistedQueryIdentifier);

  const preservedQueryStory = {
    ...pageQueryStory,
    content: liveQueryStoryContentFromLocalStorage ?? pageQueryStory.content
  }

  const liveQueryStory = useStoryblokState(preservedQueryStory);
  localStorage.set(persistedQueryIdentifier, liveQueryStory.content);

  const components = liveQueryStory.content.body.map(blok => (<StoryblokComponent blok={blok} key={blok._uid} />))

  return (
    <Layout>
      <div {...storyblokEditable(liveQueryStory.content)}>
        <h1>{liveQueryStory.name}</h1>
        {components}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($full_slug: String!) {
    storyblokEntry(full_slug: { eq: $full_slug }) {
      content
      name
      full_slug
      uuid
      id
      internalId
    }
  }
`