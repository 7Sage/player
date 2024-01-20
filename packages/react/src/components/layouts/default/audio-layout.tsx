import * as React from 'react';

import { useLayoutName } from '../utils';
import { DefaultAudioLargeLayout } from './audio-layout-large';
import { DefaultAudioSmallLayout } from './audio-layout-small';
import { DefaultLayoutContext } from './context';
import { createDefaultMediaLayout, type DefaultLayoutProps } from './media-layout';
import { DefaultPlayButton } from './shared-layout';
import { slot, useDefaultVideoLayoutSlots, type DefaultAudioLayoutSlots } from './slots';

/* -------------------------------------------------------------------------------------------------
 * DefaultAudioLayout
 * -----------------------------------------------------------------------------------------------*/

const MediaLayout = createDefaultMediaLayout({
  type: 'audio',
  smLayoutWhen: ({ width }) => width < 576,
  LoadLayout: DefaultAudioLoadLayout,
  SmallLayout: DefaultAudioSmallLayout,
  LargeLayout: DefaultAudioLargeLayout,
});

export interface DefaultAudioLayoutProps extends DefaultLayoutProps<DefaultAudioLayoutSlots> {}

/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, captions, live streams
 * and more out of the box.
 *
 * @attr data-match - Whether this layout is being used.
 * @attr data-size - The active layout size.
 * @example
 * ```tsx
 * <MediaPlayer src="audio.mp3">
 *   <MediaProvider />
 *   <DefaultAudioLayout icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
function DefaultAudioLayout(props: DefaultAudioLayoutProps) {
  useLayoutName('audio');
  return <MediaLayout {...props} />;
}

DefaultAudioLayout.displayName = 'DefaultAudioLayout';
export { DefaultAudioLayout };

/* -------------------------------------------------------------------------------------------------
 * DefaultAudioLoadLayout
 * -----------------------------------------------------------------------------------------------*/

function DefaultAudioLoadLayout() {
  const { isSmallLayout } = React.useContext(DefaultLayoutContext),
    slots = useDefaultVideoLayoutSlots()?.[isSmallLayout ? 'smallLayout' : 'largeLayout'];
  return (
    <div className="vds-load-container">
      {slot(slots, 'loadButton', <DefaultPlayButton tooltip="top" />)}
    </div>
  );
}

DefaultAudioLoadLayout.displayName = 'DefaultAudioLoadLayout';
