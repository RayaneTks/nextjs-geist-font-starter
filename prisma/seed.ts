import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Créer l'utilisateur admin par défaut
  const hashedPassword = await hash('admin', 10)
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@ddrental.com'
    }
  })

  // Créer quelques FAQ par défaut
  const faqs = [
    {
      question: 'Comment puis-je réserver un véhicule ?',
      answer: 'Vous pouvez réserver un véhicule directement sur notre site web en sélectionnant le véhicule de votre choix et en remplissant le formulaire de réservation. Nous vous contacterons rapidement pour confirmer votre demande.',
      orderIndex: 1
    },
    {
      question: 'Quels documents sont nécessaires pour la location ?',
      answer: 'Pour louer un véhicule, vous devez présenter un permis de conduire valide, une pièce d\'identité et un justificatif de domicile de moins de 3 mois.',
      orderIndex: 2
    },
    {
      question: 'Proposez-vous un service de livraison ?',
      answer: 'Oui, nous proposons la livraison de nos véhicules dans toute la région PACA. Contactez-nous pour plus de détails sur ce service.',
      orderIndex: 3
    }
  ]

  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { 
        question_answer: {
          question: faq.question,
          answer: faq.answer
        }
      },
      update: {},
      create: {
        ...faq,
        isVisible: true
      }
    })
  }

  // Créer quelques témoignages par défaut
  const testimonials = [
    {
      clientName: 'Jean Dupont',
      rating: 5,
      comment: 'Service exceptionnel ! La voiture était impeccable et la livraison très professionnelle.',
      isVisible: true
    },
    {
      clientName: 'Marie Martin',
      rating: 5,
      comment: 'Très satisfaite de la location. Le personnel est à l\'écoute et les véhicules sont de grande qualité.',
      isVisible: true
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial
    })
  }

  console.log('Base de données initialisée avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
