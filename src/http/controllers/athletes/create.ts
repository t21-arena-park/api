import type { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'

import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const createBodySchema = z.object({
    name: z.string(),
    birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Formato da data inválido',
    }),
    handedness: z.enum(['RIGHT', 'LEFT']),
    gender: z.enum(['MALE', 'FEMALE']),
    bloodType: z.enum([
      'A_POSITIVE',
      'A_NEGATIVE',
      'B_POSITIVE',
      'B_NEGATIVE',
      'AB_POSITIVE',
      'AB_NEGATIVE',
      'O_POSITIVE',
      'O_NEGATIVE',
    ]),
    status: z.boolean().default(true),
    guardianName: z.string(),
  })

  const {
    name,
    birthDate,
    handedness,
    gender,
    bloodType,
    status,
    guardianName,
  } = createBodySchema.parse(request.body)

  const athlete = await prisma.athlete.create({
    data: {
      name,
      birth_date: new Date(birthDate),
      handedness,
      gender,
      blood_type: bloodType,
      status,

      address: {
        create: {},
      },

      guardian: {
        create: {
          name: guardianName,
        },
      },

      consents: {
        create: [
          {
            type: 'IMAGE',
            is_agreed: false,
            agreed_at: new Date(),
          },

          {
            type: 'RESPONSIBILITY',
            is_agreed: false,
            agreed_at: new Date(),
          },
        ],
      },

      athleteAssociations: {
        create: {
          user_id: userId,
        },
      },
    },
  })

  await prisma.anamnesis.create({
    data: {
      athlete_id: athlete.id,

      sections: {
        create: [
          {
            title: 'Rotina e atividades atuais',
            icon: 'LIST_TODO',

            questions: {
              create: [
                {
                  title:
                    'Descreva como é a rotina atual do atleta (descrever um dia típico do começo ao fim, com as atividades de rotina em casa, outras atividades, retorno a casa, atividades realizadas em casa, período de sono, aulas ou curso realizados, etc)',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Descreva como está a vida do atleta no presente momento:',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },
              ],
            },
          },

          {
            title: 'Saúde Física e Funcionalidades',
            icon: 'LIST_TODO',

            questions: {
              create: [
                {
                  title:
                    'Dificuldades para andar, usar as mãos, escrever, vestir-se sozinho, manter o equilíbrio?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Perda da audição ou visão?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Uso de aparelho auditivo ou óculos?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Histórico de doenças e condições (doença caríaca, trauma de crânio, doença vascular, etc..)?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Histórico médico anterior?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Perda de consciência (quando e motivo)?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Histórico de cirurgias?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Histórico familiar de doenças (doença cardíaca, hipertensão, doença psiquiátrica, etc..)',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'Alimentação',
            icon: 'LIST_TODO',

            questions: {
              create: [
                {
                  title:
                    'Quantas pessoas se alimentam na casa?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Quem é o responsável pela compra de alimentos?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'A compra é feita (diariamente, semanalmente, quinzenalmente)',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Onde os alimentos são comprados (supermercado, feira)?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Quem prepara as refeições?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Onde as refeições são realizadas?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Quantas refeições são realizadas pela família',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Quem participa das refeições?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Alguém da família possui alergia alimentar? Se sim, quem e a que?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },
                
                {
                  title:
                    'Alguém da família possui intolerância alimentar? Se sim, quem e a que?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Alguém da família segue alguma dieta especial? Se sim, quem e por quê?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Quais são os alimentos preferidos da família?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                }, 

                {
                  title:
                    'Alguém da família faz uso de algum suplemento alimentar? Se sim, quem e qual? Quem indicou?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Qual a quantidade de sal usada em 1 mês pela família?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Qual a quantidade de óleo usada em 1 mês pela família?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },

                {
                  title:
                    'Produtos diet e light são consumidos pela família?',
                  question_type: 'ESSAY',

                  answers: {
                    create: {
                      value: '',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  return reply.status(201).send()
}
