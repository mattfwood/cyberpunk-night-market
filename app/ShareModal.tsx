import { Dialog } from '@headlessui/react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const generateQrCode = async () => {
    const qrCode = await QRCode.toDataURL(window.location.href);
    setQrCode(qrCode);
  };

  useEffect(() => {
    generateQrCode();
  }, []);

  return (
    <>
      <button
        className="ml-[100%] bg-primary text-white p-2 rounded-md"
        onClick={openModal}
      >
        Share
      </button>
      <Dialog open={isOpen} onClose={closeModal}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-md p-4">
            <Dialog.Title className="text-lg font-bold">
              Share Link to Night Market
            </Dialog.Title>
            <img src={qrCode} alt="QR Code to current URL" />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
