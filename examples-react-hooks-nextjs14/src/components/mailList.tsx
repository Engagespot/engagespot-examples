import type { EngagespotNotification } from '@engagespot/react-hooks';
import { useActions } from '@engagespot/react-hooks';
import { MoreVertical } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DropDownMenu = ({ item }: { item: EngagespotNotification }) => {
  const actions = useActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={false}>
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => actions.deleteNotification(item.id as number)}
        >
          Delete
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => actions.markAsRead(item.id as number)}>
          Mark As Read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function MailList({ items }: { items: EngagespotNotification[] }) {
  return (
    <ScrollArea className="h-[600px]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map(item => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.clickedAt && (
                    <span className="flex h-2 w-2  rounded-full bg-blue-600" />
                  )}
                </div>

                <div>
                  <DropDownMenu item={item} />
                </div>
              </div>
            </div>

            {item.message && (
              <div className="text-xs font-semibold text-muted-foreground relative bottom-1">
                {item.message}
              </div>
            )}

            <div className={cn('mr-auto text-xs text-muted-foreground')}>
              {item.createdAtRelative}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
