import type { PreferenceChannel } from '@engagespot/react-hooks';
import { usePreferences, useWebPush } from '@engagespot/react-hooks';
import React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const PreferenceChannels = ({
   categoryId,
   channel,
}: {
   channel: PreferenceChannel;
   categoryId?: number;
}) => {
   const [enabled, setEnabled] = React.useState(true);
   const { setPreferences } = usePreferences();
   const { subscribe, webPushState } = useWebPush();
   const disabled = channel.id === 'webPush' && webPushState === 'denied';

   React.useEffect(() => {
      setEnabled(channel.enabled);
   }, [channel.enabled]);

   return (
      <div className='w-full flex justify-between'>
         <div className='items-center flex justify-between space-x-2 border h-fit w-full p-4'>
            <Label className='flex items-center gap-2' htmlFor='channel-switch'>
               {channel.name}
               <span
                  className={`flex h-2 w-2  rounded-full ${
                     enabled ? 'bg-green-400' : 'bg-red-400'
                  }`}
               />
            </Label>

            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <div>
                        <Switch
                           checked={enabled}
                           disabled={disabled}
                           onCheckedChange={() => {
                              if (channel.id === 'webPush' && webPushState !== 'granted') {
                                 subscribe();
                              }

                              setEnabled(!enabled);

                              setPreferences([
                                 {
                                    categoryId,
                                    channels: [{ channel: channel.id, enabled: !enabled }],
                                 },
                              ]);
                           }}
                           id='channel-switch'
                        />
                     </div>
                  </TooltipTrigger>

                  {disabled && (
                     <TooltipContent>
                        <p>Please allow notification in your browser</p>
                     </TooltipContent>
                  )}
               </Tooltip>
            </TooltipProvider>
         </div>
      </div>
   );
};
