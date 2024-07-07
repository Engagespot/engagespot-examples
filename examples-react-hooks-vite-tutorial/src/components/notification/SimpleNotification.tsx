import type { EngagespotNotification } from '@engagespot/react-hooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function SimpleNotification({ items }: { items: EngagespotNotification[] }) {
   return (
      <ScrollArea className='h-[600px]'>
         <div className='flex flex-col gap-2 p-4 pt-0 pb-16'>
            {items.map((item) => (
               <div
                  key={item.id}
                  className={cn(
                     'flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                  )}
               >
                  <div className='flex w-full flex-col gap-1'>
                     <div className='flex gap-3 items-center justify-between'>
                        <div className='flex items-center gap-2'>
                           <div className='font-semibold'>{item.title}</div>
                           {!item.clickedAt && (
                              <span className='flex h-2 w-2  rounded-full bg-blue-600' />
                           )}
                        </div>
                     </div>
                  </div>

                  {item.message && (
                     <div className='text-xs font-semibold text-muted-foreground relative bottom-1'>
                        {item.message}
                     </div>
                  )}

                  <div className={cn('mr-auto text-xs text-muted-foreground')}>
                     {item.createdAtRelative}
                  </div>
               </div>
            ))}
         </div>
      </ScrollArea>
   );
}
