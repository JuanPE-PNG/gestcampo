import { PhaseCard } from '@/components/phase-card';
import { Screen } from '@/components/screen';

export default function ChatScreen() {
  return (
    <Screen
      title="Chat"
      subtitle="Anota los gastos durante el día, con o sin internet.">
      <PhaseCard
        fase="FASE F2"
        titulo="Captura offline"
        descripcion="Acá va a vivir el chat donde se escribe igual que en WhatsApp. Cada mensaje se guarda en el teléfono en el momento, sin depender de la conexión."
        puntos={[
          'Mensajes de texto y notas de voz.',
          'Guardado inmediato y permanente.',
          'Funciona en modo avión.',
        ]}
      />
    </Screen>
  );
}
