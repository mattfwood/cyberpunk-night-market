import { Dialog } from '@headlessui/react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const generateQrCode = async () => {
    const qrCode = await QRCode.toDataURL(window.location.href);
    setQrCode(qrCode);
  };

  useEffect(() => {
    if (isOpen) {
      generateQrCode();
    } else {
      setQrCode(null);
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="ml-[100%] bg-primary text-white p-2 text-sm rounded-md"
          onClick={openModal}
        >
          Share
        </button>
      </div>
      <Dialog open={isOpen} onClose={closeModal}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-md p-4">
            <Dialog.Title className="text-lg font-bold">
              Share Link to Night Market
            </Dialog.Title>
            {!qrCode ? (
              <img
                className="max-w-[404px] max-h-[404px] w-full h-full"
                // @ts-ignore
                src={qrCode}
                alt="QR Code to current URL"
              />
            ) : (
              <div className="animate-pulse w-full">Generating QR Code...</div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
