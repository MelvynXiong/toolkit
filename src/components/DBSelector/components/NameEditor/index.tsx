import React, { useEffect, useState } from 'react';
import { Input } from '@ali/wind';

interface Props {
  defaultName: string;
  onOk: (val: string) => void;
}
export default function NameEditor({ defaultName, onOk }: Props) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  return <Input maxLength={64} value={name} onChange={setName} onBlur={() => onOk(name)} />;
}
