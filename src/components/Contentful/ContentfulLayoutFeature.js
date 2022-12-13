import React from 'react'
import PropTypes from 'prop-types'
import Feature from '../Feature'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulLayoutFeature = props => {
  const {
    moduleConfig: {
      headline,
      description,
      image,
      imageMobile,
      imageDarkMode,
      imageMobileDarkMode,
      imageLink,
      alignItemsCenter,
      contentAlignment,
      contentPaddingTop,
      eyebrow,
      withContent,
      imageWidth,
      imageAlignment,
      newTab,
      animation,
      backgroundColor,
      backgroundImage,
      backgroundImageDarkMode,
      backgroundImageMobile,
      headlineMarginTop0,
      sectionPadding,
      noPaddingBottom,
      cta,
      ctaSecond,
      embed,
      previewMode = false,
      featureItems,
      imageShadow,
      hideImageOnMobile,
      customClass,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage, previewMode)
  const bgDarkUrl = parseContentfulAssetUrl(
    backgroundImageDarkMode,
    previewMode
  )
  const bgMobileUrl = parseContentfulAssetUrl(
    backgroundImageMobile,
    previewMode
  )

  return (
    <Feature
      imageMobile={imageMobile}
      imageLink={imageLink}
      eyebrow={eyebrow}
      description={previewMode ? description : html}
      headline={headline}
      image={image}
      imageDarkMode={imageDarkMode}
      imageMobileDarkMode={imageMobileDarkMode}
      alignItemsCenter={alignItemsCenter}
      contentAlignment={contentAlignment}
      contentPaddingTop={contentPaddingTop}
      withContent={withContent}
      imageWidth={imageWidth}
      imageAlignment={imageAlignment}
      newTab={newTab}
      animation={animation}
      backgroundColor={backgroundColor}
      backgroundImage={bgUrl || ''}
      backgroundImageDarkMode={bgDarkUrl || ''}
      backgroundImageMobile={bgMobileUrl || ''}
      headlineMarginTop0={headlineMarginTop0}
      sectionPadding={sectionPadding}
      noPaddingBottom={noPaddingBottom}
      cta={cta}
      ctaSecond={ctaSecond}
      embed={embed}
      featureItems={featureItems}
      imageShadow={imageShadow}
      hideImageOnMobile={hideImageOnMobile}
      customClass={customClass}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { featureItemsCollection, embed } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      featureItems: featureItemsCollection?.items,
      ...data,
      embed: embed
        ? {
            embed: embed,
            thumbnail: embed.thumbnail,
            playOnPopup: embed.playOnPopup,
          }
        : undefined,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayoutFeature)

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    cta: PropTypes.object,
    noPaddingBottom: PropTypes.bool,
    imageShadow: PropTypes.bool,
  }),
}
