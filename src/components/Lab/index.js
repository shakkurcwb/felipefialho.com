import React from 'react'
import ReactGA from 'react-ga'
import { graphql, useStaticQuery } from 'gatsby'

import { Date } from 'components/Typography'
import BoxHandler from 'components/BoxHandler';

import * as S from './styled'

const trackClickLab = (item) => {
  ReactGA.event({
    category: 'Lab',
    action: 'click',
    label: `Lab - Going to ${item}`
  })
}

const LabImg = ({ imageSrc }) => {
  const { images } = useStaticQuery(
    graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "lab" } }) {
          edges {
              node {
                extension
                relativePath
                childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  )

  const image = images.edges.find(image => {
    return image.node.relativePath === imageSrc.relativePath
  })

  return <S.Image fluid={image.node.childImageSharp.fluid} />
}

const Lab = ({ content }) => {
  return (
    <S.LabList>
      {content.map(({ node }) => {
        return (
          <BoxHandler key={node.id}>
            <S.LabItem href={node.path} title={node.title} onClick={trackClickLab}>
              <LabImg imageSrc={node.imageSrc} />
              <Date>{node.date}</Date>
              <S.Title>{node.title}</S.Title>
              <S.Text>{node.description}</S.Text>
            </S.LabItem>
          </BoxHandler>
        )
      })}
    </S.LabList>
  )
}

export default Lab
