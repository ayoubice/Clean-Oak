import _ from 'lodash'
import { sendMail } from '../sendgrid'

function getSurveyLink(surveyId,memberId)  {
  console.log('Start build mail link')
  return `http://localhost:3000/#/viewer/${surveyId}/${memberId}`
}

function getMailContent(surveyId,member) {
  console.log('Start build Email content')
  const link = getSurveyLink(surveyId,member)
  return `
      Hey, Youssef. <br><br>
      here is the survey like : ${link}
      Survey team
    `
}

function getMailSubject(surveyTitle) {
  return `Participate to ${surveyTitle}`
}

export const sendSurveyMail = (survey)  => {
  console.log('Start sending Email')
  if(survey) {
      return _.map(survey.list.members, (member)  => {
        const email = member.email
        const subject = getMailSubject(survey.name)
        const content = getMailContent()

        return sendMail({ toEmail: email, subject  , content })
      })
  }

  return null
}
