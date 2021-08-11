import React, { ReactNode } from 'react';
import { Button, Dialog } from '@ali/xconsole/ui';

interface Props {
  actionName: string;
  className?: string;
  text?: boolean;
  dialogTitle: ReactNode;
  dialogContent: ReactNode;
  operation?: () => void;
}

export default function OperationEntry({
  actionName,
  className,
  dialogTitle,
  dialogContent,
  operation,
  text,
}: Props) {
  function openDialog() {
    Dialog.show({
      title: dialogTitle,
      content: dialogContent,
      onOk: async () => {
        await operation();
      },
    });
  }
  return (
    <Button onClick={openDialog} className={className} type="primary" text={text}>
      {actionName}
    </Button>
  );
}
