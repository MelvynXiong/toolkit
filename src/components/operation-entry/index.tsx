import React, { ReactNode } from 'react';
import { Button, Dialog } from '@ali/xconsole/ui';

interface Props {
  actionName: string;
  className?: string;
  text?: boolean;
  dialogTitle: ReactNode;
  dialogContent?: ReactNode;
  operation?: () => void;
  footer?: ReactNode;
  renderDialogContent?: (props: any) => ReactNode;
  disabled?: boolean;
}

export default function OperationEntry({
  actionName,
  className,
  dialogTitle,
  dialogContent,
  operation,
  text,
  footer,
  renderDialogContent,
  disabled,
}: Props) {
  function openDialog() {
    const dialog = Dialog.show({
      title: dialogTitle,
      content: renderDialogContent ? renderDialogContent({ onCancel }) : dialogContent,
      onOk: async () => {
        if (operation) {
          await operation();
        }
        onCancel();
      },
      footer,
    });

    function onCancel() {
      dialog.hide();
    }
  }
  return (
    <Button
      onClick={openDialog}
      disabled={disabled}
      className={className}
      type="primary"
      text={text}
    >
      {actionName}
    </Button>
  );
}
