import React from "react";
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

/**
 * The Component that renders a featured media, typically an image. The featured
 * media can represent an individual Post, Page, or Custom Post Type.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured media.
 *
 * @returns A react component.
 */

const Featuredmedia = ({ state, id }) => {
  const media = state.source.attachment[id];
  const data = state.source.get(state.router.link);

  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container Data={data} isAmp={state.frontity.mode === "amp"}>
      <StyledImage
        alt={media.title.rendered}
        src={media.source_url}
        srcSet={srcset}
        width={media?.media_details?.width}
        height={media?.media_details?.height}
      />
    </Container>
  );
};

export default connect(Featuredmedia);

const Container = styled.div`
  height: ${({ Data }) =>
    Data.isArchive ? "200px" : Data.isPost ? "auto" : "500px"};
  width: ${({ Data }) => (Data.isArchive ? "200px" : "auto")};
  ${({ isAmp }) => isAmp && "position: relative;"};

  @media (max-width: 600px) {
    height: ${({ Data }) =>
      Data.isArchive ? "200px" : Data.isPost ? "auto" : "400px"};
    width: ${({ Data }) => (Data.isArchive ? "200px" : "auto")};
    ${({ isAmp }) => isAmp && "position: relative;"};
  }
`;

const StyledImage = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: top;
`;
